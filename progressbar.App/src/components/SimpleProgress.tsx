import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

export type Message = {
    progress: number
}

export default function SimpleProgress() {
  const [progress, setProgress] = React.useState(0);


  React.useEffect(() => {

    const subject: Subject<Message> = new Subject();

    subject.subscribe((message: Message): void => {
        setProgress(message.progress);
        console.log(`Progress received: ${message.progress}`);
    })

    const connection:HubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5019/progress")
    .build();

    connection.start().then(() => {
        console.log("Conexion exitosa");
    }).catch((error) => console.error(error.message));


    connection.on("sendMessage", (message: Message) => {
        subject.next(message);
    })

    return () => {
        connection.stop();
    };
  }, []);

  const handleStart = async() => {
    await axios.get('http://localhost:5019/api/task/start');
  }


  return (
    <Box sx={{ width: "100%" }} mb={5}>\
      <Typography variant="h4">Timer progress</Typography>
      <LinearProgress variant="determinate" value={progress} sx={{my:2}} color="success"  />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button variant="contained" onClick={handleStart}>
          Start task
        </Button>
        <Typography variant="h4" style={{ margin: "0 20px" }}>
          {progress} %
        </Typography>
      </Box>
    </Box>
  );
}