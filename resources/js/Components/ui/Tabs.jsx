import Activity from "@/Components/UserAllActivity";
import { Thread } from "@/Components/UserAllThreads";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Tabs({ threads, activities }) {
    const [ activeTab, setActiveTab ] = useState('threads');

    return (
        <div className="py-4">
            <nav className="border-b border-sand-sand5 flex gap-6 py-2 font-medium ">
                <button onClick={ () => setActiveTab('threads') }
                    className={ `${activeTab == 'threads' ? 'text-sand-sand12 border-b-2 border-sand-sand9' : 'text-sand-sand11 '}` }
                >Threads</button>
                <button
                    className={ `${activeTab == 'activities' ? 'text-sand-sand12 border-b-2 border-sand-sand9' : 'text-sand-sand11'}` }
                    onClick={ () => setActiveTab('activities') }>Activities</button>

            </nav>
            <main>
                { activeTab === 'threads' && <Thread threads={ threads.data } /> }
                { activeTab === 'activities' && <Activity activities={ activities.data } />
                }
            </main>
        </div>
    );
}

