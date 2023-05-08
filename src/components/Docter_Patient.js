import '../App.css';
import './style.css'
import { TopNav, LabelText, GridCol, GridRow, Paragraph, H2, H3, H4,H5,Button,H1 } from 'govuk-react';
import { useState,useEffect } from 'react';
import Modal from './sub_components/Modal'
import axios from 'axios';

function Docter_Patient() {
    const [show,setShow] = useState()
    const [users, setUsers] = useState([]);
    const [usersDetails, setUsersDetails] = useState([]);
    const [apptDetails, setApptDetails] = useState([]);
    const [isDoneLoading,setIsDoneLoading] = useState();
    useEffect(() => {
        getAppts();
    }, []);

   function showModal() {
        setShow(true)
      };
    
      function hideModal() {
        setShow(false)
      };

      function getAppts() {
        axios.get('http://localhost/API/').then(function(response) {
            console.log(response.data.NHS_Number);
            setUsers(response.data);
            setIsDoneLoading(true)
           // giveNHSData(response.data.NHS_Number)
           response.data.map(function (userDeets) {
            giveNHSData(userDeets.NHS_Number)

           })
        });
    }

    function giveNHSData(inputs) {
        var searchData = { 
            "number": inputs
          }
        axios.post('http://localhost/API/', {
            item: {number: searchData},
        })
            .then(response => {
                const {data} = response;
                var joined = usersDetails.concat(data);
                setUsersDetails(joined);

                console.log(response);
                
            })
            .catch(err => {
                console.error(err);
            });
    }


    

    function displayComp() {
        return usersDetails.map(function (userDeets) {
            return (
                <div>
                    <GridRow>
                    <GridCol setWidth="one-half" className='patientCard'>
                        <br />
                        <H5>Patient Name : {userDeets.First_Name}  {userDeets.Last_Name} </H5>
                        <Button onClick = {() => {
                            showModal()
                        }}>
                        View Patient
                        </Button>
                    </GridCol>
                    
                </GridRow>
                <Modal show={show} handleClose={() => { hideModal()}}>
                    
                    <H5>First Name : {userDeets.First_Name}</H5>
                    <H5>Last Name : {userDeets.Last_Name} </H5>
                    <H5>Vaccinated? : {userDeets.Vaccine_Status? (
                        "No"
                    ) : (
                        "Yes"
                    )}</H5>
                    <H5>NHS Number {userDeets.NHS_Number}</H5>
                    <H5>Email : {userDeets.Email}</H5>
                    <H5>Mobile No : {userDeets.Mobile_No}</H5>
                    <H5>Surgery Location : {userDeets.Surgery_Location}</H5>
                     </Modal>
                </div>
            )
        })
    }


    return (
        <div className="App">
            <TopNav company={<TopNav.Anchor href="http://localhost:3000" target="new"><TopNav.IconTitle >AFQC Labs</TopNav.IconTitle></TopNav.Anchor>} serviceTitle={<><TopNav.NavLink href="http://localhost:3000/DocterAppointment" target="new">Appointments</TopNav.NavLink>&nbsp;<TopNav.NavLink href="http://localhost:3000/DocterPatient" target="new"> Patient Records</TopNav.NavLink></>} />
            <div className='borderColor'>
                <H2 className='HeaderText'>
                    Docter Patient Management
                </H2>
                
            </div>
            <br />
            {displayComp()}
        </div>
    );
}

export default Docter_Patient;
