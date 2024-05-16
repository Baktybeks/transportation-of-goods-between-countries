import GoogleButton from '@/components/googleButton/GoogleButton';
import SighInForm from '@/components/sighInForm/SighInForm';


export default function SighIn() {
  return (
    <div className='stack'>
      <h1>SighIn</h1>
      <GoogleButton/>
      <SighInForm/>
    </div>
  );
}
