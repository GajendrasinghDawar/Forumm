import Container from "@/Components/Container";
import Tabs from "@/Components/ui/Tabs";

export default function Show({ user, threads, activities }) {

    return (
        <Container>
            <div className="md:grid md:grid-cols-5 ">
                <section className="space-y-1 my-3 md:col-start-2 md:col-span-3 py-2">
                    <div className="">
                        <h1 className="text-2xl">{ user.name }</h1>
                        <p>{ user.email }</p>
                        <p>Joined <span>{ user.created_at }</span></p>
                    </div>
                    <Tabs threads={ threads } activities={ activities } />
                </section>
            </div>
        </Container>
    );
}



