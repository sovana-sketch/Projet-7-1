async function fetchData() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }  
}

//button filter
