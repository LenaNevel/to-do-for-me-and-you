const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export async function createList(data) {
    console.log("I AM THE SERVICES FUNCTION AND I AM READING DATA")
    const response = await fetch('http://localhost:4000/api/create-list', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    console.log(response)
}