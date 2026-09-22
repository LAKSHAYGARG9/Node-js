package com.example.universityattendanceapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.FirebaseFirestore;
import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {

    private EditText etEmail, etPassword;
    private RadioGroup rgRole;
    private FirebaseAuth mAuth;
    private FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();

        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        rgRole = findViewById(R.id.rgRole);

        Button btnLogin = findViewById(R.id.btnLogin);
        Button btnRegister = findViewById(R.id.btnRegister);

        btnLogin.setOnClickListener(v -> loginUser());
        btnRegister.setOnClickListener(v -> registerUser());
    }

    private void registerUser() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        int selectedId = rgRole.getCheckedRadioButtonId();

        if (email.isEmpty()) {
            etEmail.setError("Email is required");
            etEmail.requestFocus();
            return;
        }

        if (password.isEmpty()) {
            etPassword.setError("Password is required");
            etPassword.requestFocus();
            return;
        }

        if (password.length() < 6) {
            etPassword.setError("Password must be at least 6 characters long");
            etPassword.requestFocus();
            return;
        }

        if (selectedId == -1) {
            Toast.makeText(this, "Please select a role (Instructor or Student)", Toast.LENGTH_SHORT).show();
            return;
        }

        String role = (selectedId == R.id.rbInstructor) ? "INSTRUCTOR" : "STUDENT";

        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnSuccessListener(authResult -> {
                    FirebaseUser user = mAuth.getCurrentUser();
                    if (user != null) {
                        Map<String, Object> userData = new HashMap<>();
                        userData.put("email", email);
                        userData.put("role", role);
                        userData.put("name", email.split("@")[0]);

                        db.collection("users").document(user.getUid())
                                .set(userData)
                                .addOnSuccessListener(aVoid -> {
                                    Toast.makeText(this, "Account Created Successfully!", Toast.LENGTH_SHORT).show();
                                    navigateToDashboard(role);
                                })
                                .addOnFailureListener(e ->
                                        Toast.makeText(this, "Firestore Error: " + e.getLocalizedMessage(), Toast.LENGTH_LONG).show()
                                );
                    }
                })
                .addOnFailureListener(e ->
                        Toast.makeText(this, "Registration Failed: " + e.getLocalizedMessage(), Toast.LENGTH_LONG).show()
                );
    }

    private void loginUser() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (email.isEmpty()) {
            etEmail.setError("Email is required");
            etEmail.requestFocus();
            return;
        }

        if (password.isEmpty()) {
            etPassword.setError("Password is required");
            etPassword.requestFocus();
            return;
        }

        mAuth.signInWithEmailAndPassword(email, password)
                .addOnSuccessListener(authResult -> {
                    FirebaseUser user = mAuth.getCurrentUser();
                    if (user != null) {
                        db.collection("users").document(user.getUid()).get()
                                .addOnSuccessListener(documentSnapshot -> {
                                    if (documentSnapshot.exists()) {
                                        String role = documentSnapshot.getString("role");
                                        navigateToDashboard(role);
                                    } else {
                                        Toast.makeText(this, "User profile not found in database", Toast.LENGTH_LONG).show();
                                    }
                                })
                                .addOnFailureListener(e ->
                                        Toast.makeText(this, "Database Error: " + e.getLocalizedMessage(), Toast.LENGTH_LONG).show()
                                );
                    }
                })
                .addOnFailureListener(e ->
                        Toast.makeText(this, "Auth Failed: " + e.getLocalizedMessage(), Toast.LENGTH_LONG).show()
                );
    }

    private void navigateToDashboard(String role) {
        if ("INSTRUCTOR".equals(role)) {
            startActivity(new Intent(this, InstructorDashboardActivity.class));
        } else {
            startActivity(new Intent(this, StudentDashboardActivity.class));
        }
        finish();
    }
}