import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

// Função para salvar um novo feedback
export async function saveFeedback(userId, textId, rating, feedback) {
    try {
        const feedbackData = {
            userId,
            rating,
            feedback,
            createdAt: new Date(),
        };

        // Adiciona textId apenas se ele existir
        if (textId) {
            feedbackData.textId = textId;
        }

        const docRef = await addDoc(collection(db, 'feedbacks'), feedbackData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Erro ao salvar feedback:', error);
        return { success: false, error: error.message };
    }
}

// Função para salvar um problema reportado
export async function saveReportedProblem(userId, problemType, description) {
    try {
        const problemData = {
            userId,
            problemType,
            description,
            status: 'pending', // pending, in_progress, resolved
            createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, 'reported_problems'), problemData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Erro ao reportar problema:', error);
        return { success: false, error: error.message };
    }
}

// Função para buscar feedbacks recentes
export async function getRecentFeedbacks() {
    try {
        const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'), limit(5));

        const querySnapshot = await getDocs(q);
        const feedbacks = [];

        querySnapshot.forEach((doc) => {
            feedbacks.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, feedbacks };
    } catch (error) {
        console.error('Erro ao buscar feedbacks:', error);
        return { success: false, error: error.message };
    }
}

// Função para buscar feedbacks de um usuário específico
export async function getUserFeedbacks(userId) {
    try {
        const q = query(collection(db, 'feedbacks'), where('userId', '==', userId), orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);
        const feedbacks = [];

        querySnapshot.forEach((doc) => {
            feedbacks.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, feedbacks };
    } catch (error) {
        console.error('Erro ao buscar feedbacks do usuário:', error);
        return { success: false, error: error.message };
    }
}

// Função para buscar problemas reportados por um usuário
export async function getUserReportedProblems(userId) {
    try {
        const q = query(collection(db, 'reported_problems'), where('userId', '==', userId), orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);
        const problems = [];

        querySnapshot.forEach((doc) => {
            problems.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, problems };
    } catch (error) {
        console.error('Erro ao buscar problemas reportados:', error);
        return { success: false, error: error.message };
    }
}
