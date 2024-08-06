import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import  InteractiveProgress from './components/InteractiveProgress';
import SimpleProgress from './components/SimpleProgress';
import CustomStyleProgress from './components/CustomStyleProgress';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center'}}>
        <Typography variant="h3" component="h2" sx={{ mb: 4 }}>
          PoC Material Progress + Signal R
        </Typography>
        <InteractiveProgress/>
        <SimpleProgress/>
        <CustomStyleProgress/>
      </Box>
    </Container>
  );
}
