using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using progressbar.Service.Hubs;
using System.Runtime.CompilerServices;

namespace progressbar.Service.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TaskController : Controller
    {
        private IHubContext<ProgressHub> _hubContext; //default inyection
        public TaskController(IHubContext<ProgressHub> hubContext) => _hubContext = hubContext;
        private static Timer timer;
        private static readonly object lockObj = new object();

        private static int counter = 0;
        private static int counter2 = 0;


        [HttpGet]
        [Route("start")]
        public async Task<IActionResult> Start()
        {
            lock (lockObj)
            {
                if (timer != null)
                {
                    timer.Dispose();
                }

                counter2 = 0;
                timer = new Timer(async state => await IncrementCounter(), null, 0, 500);
            }

            return Ok();
        }


        [HttpGet]
        [Route("increment")]
        public async Task<IActionResult> Increment()
        {
            if (counter == 100) return Ok();
            counter = counter + 10; 
            Message messageToSend = new Message
            {
                progress = counter,
            };
            await _hubContext.Clients.All.SendAsync("sendMessage2", messageToSend);
            return Ok();
        }

        [HttpGet]
        [Route("decrement")]
        public async Task<IActionResult> Decrement()
        {
            if (counter == 0) return Ok();
            counter = counter - 10;
            Message messageToSend = new Message
            {
                progress = counter,
            };
            await _hubContext.Clients.All.SendAsync("sendMessage2", messageToSend);
            return Ok();
        }

        private async Task IncrementCounter()
        {
            lock (lockObj)
            {
                if (counter2 >= 100)
                {
                    timer.Dispose();
                    timer = null;
                    return;
                }

                counter2 = counter2 + 10;
            }

            Message messageToSend = new Message
            {
                progress = counter2,
            };

            await _hubContext.Clients.All.SendAsync("sendMessage", messageToSend);
        }
    }


    public class Message
    {
        public int progress { get; set; }
    }
}
