import '../App.css';
import './style.css'
import { TopNav, LabelText, GridCol, GridRow, Paragraph, H2, H3, H4,H5,Button,H1 } from 'govuk-react';
import { useState,useEffect } from 'react';
import Modal from './sub_components/Modal'
import axios from 'axios';

function Reception() {
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

    function cancelAppointment(inputs) {
        var searchData = { 
            "number": inputs
          }
        axios.post('http://localhost/API2/', {
            item: {number: searchData},
        })
            .then(response => {
                const {data} = response;
                console.log(response);
                window.location.reload(true);
                
            })
            .catch(err => {
                console.error(err);
            });
    }

    

    function displayComp() {
        return users.map(function (userDeets) {
            return (
                <div>
                    <GridRow>
                    <GridCol setWidth="one-half" className='apptCard'>
                        <H4>
                            Appointment ID No : {userDeets.Appoint_ID_Num}
                        </H4>
                        <H5>
                            Date : {userDeets.Date}
                        </H5>
                        <H5>
                            Time : {userDeets.Time}
                        </H5>
                        <Button onClick = {() => {
                            showModal()
                        }}>
                        View Appointment
                        </Button>
                    </GridCol>
                    
                </GridRow>
                <Modal show={show} handleClose={() => { hideModal()}}>
                    
                        {displayComp2()}
                        <H5>
                            Date : {userDeets.Date}
                        </H5>
                        <H5>
                            Time : {userDeets.Time}
                        </H5>
                    
                        <Button onClick={() => {
                            cancelAppointment(userDeets.NHS_Number)
                        }}>Cancel Appointment</Button>
                     </Modal>
                </div>
            )
        })
    }


    function displayComp2() {
        return usersDetails.map(function (userDeets) {
            return (
                <div>
                    <H2>First Name : {userDeets.First_Name}</H2>
                    <H2>Last Name : {userDeets.Last_Name} </H2>
                    <H5>Vaccinated? {userDeets.Vaccine_Status? (
                        "No"
                    ) : (
                        "Yes"
                    )}</H5>
                    <H5>NHS Number {userDeets.NHS_Number}</H5>
                </div>
            )
        })
    }





    return (
        <div className="App">
            <TopNav company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle >AFQC Labs</TopNav.IconTitle></TopNav.Anchor>} serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Appointments</TopNav.NavLink>} />
            <div className='borderColor'>
                <H2 className='HeaderText'>
                    Reception Appointment Management
                </H2>
                
            </div>
            <br />
            {displayComp()}
        </div>
    );
}

export default Reception;
