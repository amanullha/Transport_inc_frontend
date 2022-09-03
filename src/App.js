import TakeAppointment from "./Components/Appointment/TakeAppointment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="">

      <div>

        <TakeAppointment />

        <ToastContainer />

      </div>

    </div>
  );
}

export default App;
