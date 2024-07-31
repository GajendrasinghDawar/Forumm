import Container from "@/Components/Container";
import { Head } from "@inertiajs/react";

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[ status ]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[ status ]
    return (
        <Container>
            <Head title="errrrrrr"> <title>{ 'errorrrr' }</title>
            </Head>
            <div className="flex-1  border flex justify-center items-center h-full w-full">
                <h1 className="text-tomato-tomato10">404 - Not Found</h1>
                <div>
                    <h1>{ title }</h1>
                    <div>{ description }</div>
                </div>
            </div>
        </Container>

    );
}
