import CrudPage from '../components/CrudPage.jsx';
const fields=[{key:'firstname',label:'First name'},{key:'lastname',label:'Last name'},{key:'email',label:'Email',type:'email'},{key:'phone',label:'Phone',optional:true},{key:'message',label:'Message',type:'textarea',optional:true}];
export default function Contact(){return <CrudPage title="Contact" endpoint="/contacts" fields={fields} privateRead/>;}
