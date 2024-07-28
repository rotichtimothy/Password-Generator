import random
import string

def generate_password(length=12):
    if length < 4:
        raise ValueError("Password length should be at least 4 to include all character types.")

    # Character sets
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    special_chars = string.punctuation

    # Ensure the password has at least one character from each set
    password = [
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(digits),
        random.choice(special_chars)
    ]

    # Fill the rest of the password length with random choices from all sets
    all_chars = lowercase + uppercase + digits + special_chars
    password += random.choices(all_chars, k=length-4)

    # Shuffle the list to ensure randomness
    random.shuffle(password)

    # Convert list to string
    return ''.join(password)

# Example usage
if __name__ == "__main__":
    try:
        password_length = int(input("Enter the desired password length: "))
        print(f"Generated password: {generate_password(password_length)}")
    except ValueError as e:
        print(e)
