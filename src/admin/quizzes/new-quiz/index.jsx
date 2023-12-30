import { Form, Formik } from "formik";
import Input from "~/components/input";
import { useMemo } from "react";
import { useImmer } from "use-immer";
import { nanoid } from "nanoid";
import { useMutation } from "react-query";
import { createQuizService } from "~/services/quiz";
import { useAuth } from "~/store/auth/hooks";
import { createQuizSchema } from "~/validations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminNewQuiz() {
  const { email } = useAuth();
  const [questions, setQuestions] = useImmer([]);
  const navigate = useNavigate();

  const quizId = useMemo(() => nanoid(), []);

  const mutation = useMutation({
    mutationFn: (data) => createQuizService(data),
    onSuccess: () => {
      toast.success("Quiz added successfully!");
      navigate("/admin");
    },
    onError: () => toast.error("An error occured while adding quiz!"),
  });

  const isArrayValid = (arr) => {
    if (questions.length <= 0) return false;

    return arr.every(
      (obj) =>
        obj.difficulty.trim() !== "" &&
        obj.category.trim() !== "" &&
        obj.correctAnswer.trim() !== "" &&
        obj.question.text.trim() !== "" &&
        obj.incorrectAnswers.length === 3 &&
        obj.incorrectAnswers.every(
          (answer) => typeof answer === "string" && answer.trim() !== "",
        ),
    );
  };

  return (
    <div className="p-5 border rounded-lg flex items-center justify-center">
      <Formik
        initialValues={{
          quizName: "",
          quizDiff: "",
          quizCategory: "",
        }}
        validationSchema={createQuizSchema}
        onSubmit={(values) =>
          mutation.mutate({
            name: values.quizName,
            category: values.quizCategory,
            difficulty: values.quizDiff,
            email,
            quizId,
            questions,
          })
        }
      >
        {({ values, isValid }) => (
          <Form className="grid gap-y-4">
            <Input
              name="quizName"
              label="Quiz Name:"
              disabled={questions.length > 0}
            />
            <Input
              name="quizDiff"
              label="Quiz Difficulty: (medium-hard-easy)"
              disabled={questions.length > 0}
            />
            <Input
              name="quizCategory"
              label="Quiz Category:"
              disabled={questions.length > 0}
            />
            {questions.map((question, idx) => (
              <div
                key={idx}
                className="w-full flex gap-2 items-center justify-center flex-wrap border p-5 rounded-md"
              >
                <input
                  className="w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400"
                  type="text"
                  placeholder="Enter the question..."
                  onChange={(e) =>
                    setQuestions((questions) => {
                      questions[idx].question.text = e.target.value;
                    })
                  }
                />
                <input
                  className="flex-1 w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400"
                  type="text"
                  placeholder="Enter the correct answer..."
                  onChange={(e) =>
                    setQuestions((questions) => {
                      questions[idx].correctAnswer = e.target.value;
                    })
                  }
                />
                <input
                  className="flex-1 w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400"
                  type="text"
                  placeholder="Enter the incorrect answer..."
                  onChange={(e) =>
                    setQuestions((questions) => {
                      questions[idx].incorrectAnswers[0] = e.target.value;
                    })
                  }
                />
                <input
                  className="flex-1 w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400"
                  type="text"
                  placeholder="Enter the incorrect answer..."
                  onChange={(e) =>
                    setQuestions((questions) => {
                      questions[idx].incorrectAnswers[1] = e.target.value;
                    })
                  }
                />
                <input
                  className="flex-1 w-full h-10 bg-transparent border border-zinc-500 rounded outline-none px-3 text-15 font-medium text-black focus:border-zinc-400"
                  type="text"
                  placeholder="Enter the incorrect answer..."
                  onChange={(e) =>
                    setQuestions((questions) => {
                      questions[idx].incorrectAnswers[2] = e.target.value;
                    })
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="px-4 py-2 rounded-lg mt-2 bg-blue-400 text-white hover:bg-blue-600 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => {
                setQuestions((prev) => [
                  ...prev,
                  {
                    difficulty: values.quizDiff,
                    category: values.quizCategory,
                    incorrectAnswers: [],
                    correctAnswer: "",
                    question: {
                      text: "",
                    },
                  },
                ]);
              }}
              disabled={!isValid}
            >
              Add new question
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg mt-2 bg-blue-400 text-white hover:bg-blue-600 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isArrayValid(questions)}
            >
              Save Quiz
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
