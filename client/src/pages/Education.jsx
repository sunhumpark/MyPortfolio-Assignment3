import CrudPage from '../components/CrudPage.jsx';
const fields=[{key:'firstname',label:'First name'},{key:'lastname',label:'Last name'},{key:'email',label:'Email',type:'email'},{key:'title',label:'Title'},{key:'completion',label:'Completion date',type:'date'},{key:'description',label:'Description',type:'textarea'}];
export default function Education(){return <CrudPage title="Education / Qualifications" endpoint="/qualifications" fields={fields} />;}
