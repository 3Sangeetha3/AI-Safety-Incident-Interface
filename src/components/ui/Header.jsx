export const Header = () => {
    return (
        <header
            data-aos="fade-down"
            data-aos-once="true"
            className="bg-white shadow-md shadow-teal-500/10"
        >
            <div className="container mx-auto py-8">
                <h1 className="text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
                    AI Safety Incident Interface
                </h1>
                <p className="text-center text-sm mt-2 text-gray-600">
                    Track and monitor AI safety incidents in one place
                </p>
            </div>
        </header>
    );
};