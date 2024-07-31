import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UserAvatarUpload from './Partials/UserAvatarUpload';
import Container from '@/Components/Container';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <Container>
            <Head title="Profile" />

            <section className='grid w-full grid-cols-7  grid-flow-col-dense'>
                <div className="w-full  space-y-6  my-10 col-start-1 col-end-8 md:col-start-2 md:col-end-8">
                    <div className="p-4 sm:p-8 bg-sand-sand3 border border-sand-sand5   sm:rounded-lg">
                        <UserAvatarUpload auth={ auth } />
                    </div>

                    <div className="p-4 sm:p-8 bg-sand-sand3 border border-sand-sand5   sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-sand-sand3 border border-sand-sand5  sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-sand-sand3 border border-sand-sand5  sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </section>

        </Container>
    );
}
