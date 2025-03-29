from typing import Dict, Any
import openai
from app.core.config import settings
from app.models.icp import ICP
from app.core.exceptions import OpenAIServiceError

openai.api_key = settings.OPENAI_API_KEY

async def analyze_email(email_content: str, icp: ICP) -> Dict[str, Any]:
    """
    Analyze a cold email against an ICP using OpenAI's GPT models.
    """
    try:
        # Construct the prompt with ICP details
        prompt = f"""
        Analyze this cold email against the following Ideal Customer Profile (ICP):

        ICP Details:
        - Industry: {icp.industry}
        - Company Size: {icp.company_size}
        - Target Persona: {icp.persona_title}
        - Key Responsibilities: {icp.persona_responsibilities}
        - Pain Points: {icp.pain_points}
        - Goals: {icp.goals}

        Cold Email:
        {email_content}

        Please provide a detailed analysis including:
        1. Overall resonance score (0-100)
        2. Key strengths of the email
        3. Areas for improvement
        4. Specific suggestions for better alignment with the ICP
        5. Pain point addressal score (0-100)
        6. Persona match score (0-100)
        7. A suggested rewrite that better aligns with the ICP
        """

        # Call OpenAI API
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert sales email analyzer. Provide detailed, actionable feedback."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        # Parse and structure the response
        analysis = response.choices[0].message.content
        
        # Extract scores and feedback using regex or structured parsing
        # This is a simplified example - you'd want more robust parsing
        import re
        
        # Extract scores
        resonance_score = int(re.search(r"resonance score.*?(\d+)", analysis, re.IGNORECASE).group(1))
        pain_point_score = int(re.search(r"pain point.*?(\d+)", analysis, re.IGNORECASE).group(1))
        persona_score = int(re.search(r"persona match.*?(\d+)", analysis, re.IGNORECASE).group(1))

        # Extract feedback sections
        strengths = re.findall(r"strengths:.*?(?=\n|$)", analysis, re.IGNORECASE | re.DOTALL)
        weaknesses = re.findall(r"improvements:.*?(?=\n|$)", analysis, re.IGNORECASE | re.DOTALL)
        suggestions = re.findall(r"suggestions:.*?(?=\n|$)", analysis, re.IGNORECASE | re.DOTALL)
        rewrite = re.search(r"rewrite:.*?(?=\n|$)", analysis, re.IGNORECASE | re.DOTALL)

        return {
            "resonance_score": resonance_score,
            "pain_point_score": pain_point_score,
            "persona_score": persona_score,
            "strengths": [s.strip() for s in strengths],
            "weaknesses": [w.strip() for w in weaknesses],
            "suggestions": [s.strip() for s in suggestions],
            "suggested_rewrite": rewrite.group(0).strip() if rewrite else None,
            "raw_analysis": analysis
        }

    except Exception as e:
        raise OpenAIServiceError(f"Failed to analyze email: {str(e)}") 