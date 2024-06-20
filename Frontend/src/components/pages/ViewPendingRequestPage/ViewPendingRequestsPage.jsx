import React, { useEffect, useState } from 'react'
import { Header } from "../../molecules/Header/Header";
import { Grid } from '@mui/material';
import {SectionTitle} from "../../atoms/SectionTitle/SectionTitle"
import { PendingRequestsList } from '../../organisms/PendingRequestsList/PendingRequestsList';
import { PendingRequestDetails } from '../../organisms/PendingRequestDetails/PendingRequestDetails';
import { useTranslation } from 'react-i18next';

export const ViewPendingRequestsPage = () => {

  const [requests, setRequests] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [t] = useTranslation('global')


  useEffect(()=> {
    fetch('https://tfg-backend-seven.vercel.app/getAllPendingRequests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(error => console.log(error))
  }, [reloadFlag])

  return (
    <>
      <Header/>
      <Grid container justifyContent={'center'} sx={{marginTop: '80px', padding: '2em'}}>
        <SectionTitle title={t("pendingRequests.title")}/>

        <Grid item xs={12} md={6} sx={{marginTop: '2em'}}>
          {
            (!selectedRequest)
            ? <PendingRequestsList requests={requests} setSelectedRequest={setSelectedRequest}/>
            : <PendingRequestDetails selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest} setReloadFlag={setReloadFlag} reloadFlag={reloadFlag}/>
          }
          
        </Grid>

      </Grid>
    </>
  )
}
