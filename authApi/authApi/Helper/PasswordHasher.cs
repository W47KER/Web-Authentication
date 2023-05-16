using System.Security.Cryptography;

namespace authApi.Helper
{
    public class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            // Generate a random salt
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Hash the password using PBKDF2
            byte[] hash = new Rfc2898DeriveBytes(password, salt, 10000).GetBytes(32);

            // Combine the salt and hash into a single string
            byte[] combinedBytes = new byte[salt.Length + hash.Length];
            Array.Copy(salt, 0, combinedBytes, 0, salt.Length);
            Array.Copy(hash, 0, combinedBytes, salt.Length, hash.Length);
            string hashedPassword = Convert.ToBase64String(combinedBytes);

            return hashedPassword;
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            // Extract the salt and hash from the hashed password
            byte[] combinedBytes = Convert.FromBase64String(hashedPassword);
            byte[] salt = new byte[16];
            byte[] hash = new byte[32];
            Array.Copy(combinedBytes, 0, salt, 0, salt.Length);
            Array.Copy(combinedBytes, salt.Length, hash, 0, hash.Length);

            // Hash the password using the same salt and compare the hashes
            byte[] testHash = new Rfc2898DeriveBytes(password, salt, 10000).GetBytes(32);
            for (int i = 0; i < hash.Length; i++)
            {
                if (hash[i] != testHash[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
