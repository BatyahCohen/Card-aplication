import { http } from "./http";

export async function getAllCards() {
    try {
        const response = await http.get('/getAll');
        return response.data;
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
}

export async function deleteCard(id){
    try {
        const response = await http.delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error delete card:", error);
        throw error;
    }
}

export async function addCard(card){
    try {
        const response = await http.post('/add/',card);
        return response.data;
    } catch (error) {
        console.error("Error add card:", error);
        throw error;
    }
}

export async function updateCard(id,card){
    try {
        const response = await http.patch(`/update/${id}`,card);
        return response.data;
    } catch (error) {
        console.error("Error update card:", error);
        throw error;
    }
}

