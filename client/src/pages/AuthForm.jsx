import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../api.js';
import {useAuth} from '../auth.jsx';
export default function AuthForm({signup=false}) {
 const [form,setForm]=useState({name:'',email:'',password:''});
 const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
 const {signin}=useAuth(); const navigate=useNavigate();
 async function submit(e){e.preventDefault();setError('');setBusy(true);try{if(signup){await api('/users','POST',form);navigate('/signin');}else{await signin(form);navigate('/');}}catch(e){setError(e.message);}finally{setBusy(false);}}
 return <section className="assignment-panel"><h1>{signup?'Sign Up':'Sign In'}</h1><form onSubmit={submit}>{(signup?['name','email','password']:['email','password']).map(key=><label key={key}>{key}<input required type={key==='password'?'password':key==='email'?'email':'text'} minLength={key==='password'?6:undefined} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></label>)}<button disabled={busy}>{signup?'Create account':'Sign in'}</button></form>{error&&<p role="alert">{error}</p>}</section>;
}
