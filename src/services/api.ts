// src/services/api.ts
import axios from 'axios';
// const server = "http://localhost:3000"
const server = "https://gen-ai-tut-backend.up.railway.app"

const username = 'admin';
const password = 'ethanPassAdmin';
const token = btoa(`${username}:${password}`);

const apiClient = axios.create({
  baseURL: server, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`
  },
});

export default {
  getUserScores() {
    return apiClient.get('/point/all')
  },
  
  async getAllOngingMatches() {
    const allMatches = (await apiClient.get('/match/list')).data
    const onGoingMatches = []
    for (const match of allMatches) {
      if (match.matchStatus !== 'GRADED' && match.matchStatus !== 'FINISHED') {
        onGoingMatches.push(match)
      }
    }
    return onGoingMatches
  },

  async getGradedMatches() {
    const allMatches = (await apiClient.get('/match/list')).data
    const onGoingMatches = []
    for (const match of allMatches) {
      if (match.matchStatus === 'GRADED') {
        onGoingMatches.push(match)
      }
    }
    return onGoingMatches
  }
};
