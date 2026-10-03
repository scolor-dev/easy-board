import './Header.css'

export function Header() {

    const tabs = ['home', 'boards', 'settings', 'profile']    


    return (
        <header>
            <h1>0ちゃんねる</h1>
            <nav>
                <ul>
                    {tabs.map((tab) => (
                        <li key={tab}>{tab}</li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
