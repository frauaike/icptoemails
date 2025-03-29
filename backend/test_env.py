from app.core.config import settings

def test_env_variables():
    required_vars = [
        'OPENAI_API_KEY',
        'SECRET_KEY',
        'POSTGRES_SERVER',
        'REDIS_HOST',
    ]
    
    missing_vars = []
    for var in required_vars:
        if not getattr(settings, var, None):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"Missing environment variables: {', '.join(missing_vars)}")
    else:
        print("All required environment variables are set!")
        print("\nCurrent configuration:")
        for var in required_vars:
            value = getattr(settings, var)
            # Mask sensitive values
            if 'KEY' in var or 'SECRET' in var:
                value = value[:8] + '...' if value else None
            print(f"{var}: {value}")

if __name__ == "__main__":
    test_env_variables() 