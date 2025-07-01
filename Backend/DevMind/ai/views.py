from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView, status
from .AI_models import AI

AI_client = AI()
system_prompt = AI_client.get_system_prompt()
GPT_client = AI_client.get_gpt_client()
Gemini_client = AI_client.get_gemini_client()

def chat_with_model(user_input: str, temperature: int, model : str) -> str:
    messages = [
        system_prompt,
        {
            "role": "user",
            "content": user_input
        }
    ]
    
    client  =  GPT_client if model == "GPT" else Gemini_client
    completion = client.chat.completions.create(
        model="openai/gpt-4o-mini" if model == "GPT" else "google/gemini-2.0-flash-001",
        messages=messages,
        temperature=int(temperature),
    )

    assistant_reply = completion.choices[0].message.content
    return assistant_reply

class AIChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs) -> Response:
        client_response = chat_with_model(
            request.data.get("question"), request.data.get("temperature"), request.data.get('model')
        )
        return Response({"answer": client_response}, status=status.HTTP_200_OK)

