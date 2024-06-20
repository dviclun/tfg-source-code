import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthRoutes } from './routes/AuthRoutes';

import { AdminRoutes } from './routes/AdminRoutes';

import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import { EditVideoForm } from './components/organisms/EditVideoForm/EditVideoForm';
import { LandingPage } from './components/pages/LandingPage/LandingPage';
import { TrainingsPage } from './components/pages/TrainingsPage/TrainingsPage';
import { ForumPage } from './components/pages/ForumPage/ForumPage';
import { RegisterTrainingPage } from './components/pages/RegisterTrainingPage/RegisterTrainingPage';
import { RankingPage } from './components/pages/RankingPage/RankingPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage/RegisterPage';
import { AddEntryForm } from './components/organisms/AddEntryForm/AddEntryForm';
import { Entry } from './components/organisms/Entry/Entry';
import { AddVideoForm } from './components/organisms/AddVideoForm/AddVideoForm';
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage';
import { FriendsPage } from './components/pages/FriendsPage/FriendsPage';
import { ChatPage } from './components/pages/ChatPage/ChatPage';
import { PersonalizedTrainingPage } from './components/pages/PersonalizedTrainingPage/PersonalizedTrainingPage';
import { PremiumRoutes } from './routes/PremiumRoutes';
import { CreateTrainingRequest } from './components/organisms/CreateTrainingRequest/CreateTrainingRequest';
import { ViewTrainingRequests } from './components/organisms/ViewTrainingRequests/ViewTrainingRequests';
import { TrainerRoutes } from './routes/TrainerRoutes';
import { ViewPendingRequestsPage } from './components/pages/ViewPendingRequestPage/ViewPendingRequestsPage';
import { NotPremiumRoutes } from './routes/NotPremiumRoutes';
import { PaySuscriptionPage } from './components/pages/PaySuscriptionPage/PaySuscriptionPage';
import { About } from './components/atoms/About/About';
import { HelpPage } from './components/pages/HelpPage/HelpPage';

export const AppRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/login' element={
                    <AuthRoutes>
                        <LoginPage />
                    </AuthRoutes>
                } />

                <Route path='/register' element={
                    <AuthRoutes>
                        <GoogleReCaptchaProvider reCaptchaKey='6Le3qtspAAAAAJbcTkh1ZPzRE_bzBvaDmpvA-4jp'>
                            <RegisterPage />
                        </GoogleReCaptchaProvider>
                    </AuthRoutes>
                } />

                <Route path='/addVideo' element= {
                    <AdminRoutes>
                        <AddVideoForm />
                    </AdminRoutes>
                } />

                <Route path='/editVideo' element= {
                    <AdminRoutes>
                        <EditVideoForm/>
                    </AdminRoutes>
                }/>

                <Route path='/createRequest' element={
                    <PremiumRoutes>
                        <CreateTrainingRequest/>
                    </PremiumRoutes>
                }/>

                <Route path='/myRequests' element={
                    <PremiumRoutes>
                        <ViewTrainingRequests/>
                    </PremiumRoutes>
                }/>

                <Route path='/viewPendingRequests' element={
                    <TrainerRoutes>
                       <ViewPendingRequestsPage/>
                    </TrainerRoutes>
                }/>

                <Route path='/paySuscription' element= {
                    <NotPremiumRoutes>
                        <PaySuscriptionPage/>
                    </NotPremiumRoutes>
                }/>

                <Route path='/' exact element={<LandingPage />} />
                <Route path='/trainings' element={<TrainingsPage/>}/>
                <Route path='/registerTraining' element={<RegisterTrainingPage/>}/>
                <Route path='/ranking' element={<RankingPage/>}/>
                <Route path='/forum' element={<ForumPage/>}/>
                <Route path='/profile/:username' element={<ProfilePage/>}/>
                <Route path='/friends' element={<FriendsPage/>}/>
                <Route path='/chat' element={<ChatPage/>}/>
                <Route path='/personalizedTraining' element={<PersonalizedTrainingPage/>}/>
                <Route exact path='/forum/entry' element={<Entry/>}/>
                <Route exact path='/forum/addEntry' element={<AddEntryForm/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/help' element={<HelpPage/>}/>
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
    )
}
