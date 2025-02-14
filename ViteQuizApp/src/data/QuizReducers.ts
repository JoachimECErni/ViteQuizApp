import { ReducerQuizData } from "./Questions"

export const QUIZ_NAME_CHANGE = "QUIZ_NAME_CHANGE"
export const QUESTION_CHANGE = "QUESTION_CHANGE"
export const CHOICE_CHANGE = "CHOICE_CHANGE"

type Action =
  | { type: typeof QUIZ_NAME_CHANGE; payload: { id: number; name: string } }
  | {
      type: typeof QUESTION_CHANGE
      payload: { id: number; correctChoiceID?: number; description?: string }
    }
  | {
      type: typeof CHOICE_CHANGE
      payload: { questionId: number; choiceId?: number; description?: string }
    }

// Define the reducer function
export const changesReducer = (
  state: ReducerQuizData,
  action: Action
): ReducerQuizData => {
  switch (action.type) {
    case QUIZ_NAME_CHANGE:
      return {
        ...state,
        ...action.payload,
      }
    case QUESTION_CHANGE:
      const questionExists = state.questions?.some(
        (question) => question.id === action.payload.id
      )

      return {
        ...state,
        questions: questionExists
          ? state.questions?.map(
              (question) =>
                question.id === action.payload.id
                  ? {
                      ...question,
                      ...(action.payload.description !== undefined && {
                        description: action.payload.description,
                      }),
                      ...(action.payload.correctChoiceID !== undefined && {
                        correctChoiceID: action.payload.correctChoiceID,
                      }),
                    }
                  : question // Keep the other questions unchanged
            )
          : [
              ...(state.questions || []), // Spread existing questions
              {
                id: action.payload.id,
                description: action.payload.description || "", // Default value if not provided
                correctChoiceID: action.payload.correctChoiceID || 0, // Default value if not provided
                choices: [],
              },
            ], // Add new question if it does not exist
      }
    case CHOICE_CHANGE:
      const choicequestionExists = state.questions?.some(
        (question) => question.id === action.payload.questionId
      )

      return {
        ...state,
        questions: choicequestionExists
          ? state.questions?.map((question) => {
              if (question.id === action.payload.questionId) {
                const choiceExists = question.choices.some(
                  (choice) => choice.id === action.payload.choiceId
                )

                return {
                  ...question,
                  choices: choiceExists
                    ? question.choices.map(
                        (choice) =>
                          choice.id === action.payload.choiceId
                            ? {
                                ...choice,
                                description: action.payload.description,
                              } // Update the choice description
                            : choice // Keep the other choices unchanged
                      )
                    : [
                        ...question.choices,
                        {
                          id: action.payload.choiceId,
                          description: action.payload.description || "", // Default value if not provided
                          questionId: action.payload.questionId, // Link back to the question
                        },
                      ], // Add new choice if it does not exist
                }
              }
              return question // Keep the other questions unchanged
            })
          : [
              {
                id: action.payload.questionId,
                description: "", // Default value if not provided
                correctChoiceID: 0, // Default value if not provided
                choices: [
                  {
                    id: action.payload.choiceId,
                    description: action.payload.description || "", // Default value if not provided
                    questionId: action.payload.questionId, // Link back to the question
                  },
                ], // Create a new choice
              },
            ], // Create a new question with the choice if questions array does not exist
      }
    default:
      return state
  }
}
