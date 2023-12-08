import EmployeeMaster from "@/pages/dashboard/employeeMaster";


export default function MainContent({ content }) {
    // Function to render the appropriate content based on content.name
    const renderContent = () => {
        if (!content) {
            return <p>No submodule selected</p>;
        }

        switch (content.name) {
            case 'Employee Master':
                return < EmployeeMaster />;
            // Add cases for other submodule names if needed
            default:
                return <div><h3>Submodule: {content.name}</h3></div>;
        }
    };

    return (
        <main className="main-content flex-grow p-4">
            {renderContent()}
        </main>
    );
}
