import { useEffect, useState } from 'react'

function About() {
    const [aboutData, setAboutData] = useState(null)

    useEffect(() => {
        // Use the relative path to let Vite's proxy handle everything smoothly
        fetch('/about')
            .then(response => response.json())
            .then(data => setAboutData(data))
            .catch(error => console.error('Error fetching about data:', error))
    }, [])

    if (!aboutData) {
        return <p>Loading...</p>
    }

    // --- THIS FIXES THE FILENAME IMAGE BUG ---
    // This cleans up special characters in your long filename so your browser can display it
    const safeImageURL = encodeURI(aboutData.image);

    return (
        <div style={{ padding: '20px' }}>
            <h1>{aboutData.title}</h1>
            
            {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

            <img
                src={safeImageURL} // Uses the fixed, safe URL
                alt="Nihal Sundari"
                style={{ width: '300px', borderRadius: '8px', marginTop: '20px' }}
            />
        </div>
    )
}

export default About

