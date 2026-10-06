import './Header.css'

export function Header() {

    const tabs = ['home', 'boards', 'settings', 'profile']    


    return (
        <header>
            <h1>0ちゃんねる</h1>
            <nav>
                <ul>
                    {tabs.map((tab) => (
                        <li key={tab}>
                            <button type="button" className="tonal-button">{tab}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
