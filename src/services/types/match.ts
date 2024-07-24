export interface Player {
  id: number
  name: string
  key: string
}

export interface MatchPlayer {
  playerId: number
  matchId: number
  createAt: string
  player: Player
}

export interface Topic {
  id: number
  description: string
}

export interface HistoryMsg {
  id: number
  matchId: number
  text: string
  userId: number
  createAt: string
}

export interface Point {
  id: number
  userId: number
  resultId: number
  point: number
}

export interface Result {
  id: number
  winnerId: number
  comment: string
  matchId: number
  createAt: string
  points: Point[]
}

export interface Match {
  id: number
  name: string
  firstPlayerId: number
  topicId: number
  matchStatus: 'CREATED' | 'START' | 'FINISHED' | 'GRADED'
  players: MatchPlayer[]
  topic: Topic
  historyMsgs: HistoryMsg[]
  result: Result
}
