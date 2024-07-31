import Container from "@/Components/Container";
import { Head } from "@inertiajs/react";
import Activity from "@/Components/UserAllActivity";
import { Thread } from "@/Components/UserAllThreads";
import { useState } from "react";
import { Avatar } from "@/ui/Avatar";
import { CalenderIcon, MailIcon } from "@/ui/Icons";
import { motion } from "framer-motion";

export default function Show({ user, threads, activities }) {
    const [ activeTab, setActiveTab ] = useState('activities');

    return (
        <Container>
            <Head>
                <title>{ user.name }</title>
            </Head>
            <div className="grid  grid-cols-7 grid-flow-col-dense w-full ">
                <div className="col-start-1 col-end-8 md:col-start-2 md:col-span-8">
                    <div className="my-5 space-y-3">
                        <div>
                            <span className="inline-flex rounded-md -ml-1">
                                <Avatar
                                    imageUrl={ user.avatar_path }
                                    className="w-14 h-14 md:w-20 md:h-20  border-2 border-sand-sand5"
                                    alt={ `${user.name}'s profile and logout link drop down` } />
                            </span>
                            <h2>{ user.name }</h2>
                        </div>
                        <div className="flex gap-4">
                            <p className="flex gap-2  items-center  min-h-fit">
                                <MailIcon
                                    className={ 'w-4 h-4' } />
                                <span>
                                    { user.email }
                                </span>
                            </p>
                            <p className="flex gap-2 items-center  min-h-fit"> <CalenderIcon
                                className={ 'w-4 h-4' } />
                                <span>
                                    Joined { " " } { user.created_at }
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="border-b border-sand-sand5 flex gap-6 pb-1 font-semibold ">
                        <TabButton activeTab={ activeTab } setActiveTab={ setActiveTab } title="threads">
                            Threads
                        </TabButton>
                        <TabButton activeTab={ activeTab } setActiveTab={ setActiveTab } title="activities">
                            Activities
                        </TabButton>

                    </div>
                </div>

                <div className="py-4 my-3 col-start-1 col-end-8 md:col-start-2 md:col-span-8">
                    <main className="w-full">
                        { activeTab === 'threads' && <Thread threads={ threads.data } /> }
                        { activeTab === 'activities' && <Activity activities={ activities.data } />
                        }
                    </main>
                </div>
            </div>
        </Container>
    );
}

function TabButton({ setActiveTab, activeTab, title = "threads", children }) {
    return (
        <>
            <button
                onClick={ () => setActiveTab(title) }
                className={ `p-2 text-sm md:text-base relative` }
                style={ {
                    zIndex: activeTab == title ? 1 : 2
                } }
            >
                { children }
                { activeTab == title && (
                    <motion.span
                        layoutId="activeTab"
                        initial={
                            {
                                borderRadius: 8
                            }
                        }
                        className={ `inline-block absolute inset-0 bg-gray-gray5 bg-opacity-50  '}` }
                    />)
                }
            </button>
        </>
    )
}