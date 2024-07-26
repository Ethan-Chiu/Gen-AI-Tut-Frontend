// src/services/api.ts
import axios from 'axios'
import type { Match } from './types/match'

const server = import.meta.env.VITE_BACKEND_URL

console.log('server url', server)

const username = import.meta.env.VITE_BACKEND_USER
const password = import.meta.env.VITE_BACKEND_PASSWORD
const token = btoa(`${username}:${password}`)

const apiClient = axios.create({
  baseURL: server, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`
  }
})

export default {
  getUserScores() {
    return apiClient.get('/point/all')
  },

  async getAllMatches() {
    const allMatches: Match[] = (await apiClient.get('/match/list')).data
    allMatches.sort(
      (a, b) =>
        new Date(b.players[0].createAt).getTime() - new Date(a.players[0].createAt).getTime()
    )
    console.log(allMatches)
    return allMatches
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
}
