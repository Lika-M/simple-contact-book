import './PageNotFound.css'

const PageNotFound = ({ error }) => {

    return (
        <section className="not-found-page">
            {error &&
                <div>
                    {error.code && <h1>Error: {error.code}</h1>}
                    <h2>{error.message}</h2>
                    <p>The Page you are looking for doesn't exist or another error occurred. Go to <a href="/">Home page</a>.</p>
                </div>}
        </section>
    );
}

export default PageNotFound;