<?php
// Function to sanitize input
function sanitize_input($data)
{
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// Function to check if required fields are provided and not empty
function validate_required_fields($fields)
{
    foreach ($fields as $field => $value) {
        if (empty($value)) {
            return false;
        }
    }
    return true;
}

// Validate POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var(sanitize_input($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $mobile = isset($_POST['mobile']) ? sanitize_input($_POST['mobile']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    $date = date('Y-m-d');
    $time = date('H:i:s');

    // Check if required fields exist and are not empty
    $fields = ['name' => $name, 'email' => $email, 'mobile' => $mobile, 'message' => $message];
    if (!validate_required_fields($fields)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
        exit;
    }

    // Validate mobile (for India, 10-digit number)
    if (!preg_match("/^[0-9]{10}$/", $mobile)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid mobile number.']);
        exit;
    }

    // Prepare the data array
    $data = [
        'name' => $name,
        'email' => $email,
        'mobile' => $mobile,
        'message' => $message,
        'date' => $date,
        'time' => $time
    ];

    // File paths
    $csvFilePath = './queries.csv';
    $jsonFilePath = './queries.json';

    // Append to CSV file
    $file = fopen($csvFilePath, 'a');

    // Check if the file is empty, if so, add headers
    if (filesize($csvFilePath) === 0) {
        fputcsv($file, ['Name', 'Email', 'Mobile', 'Message', 'Date', 'Time']);
    }

    // Handle commas by escaping special characters
    fputcsv($file, [
        $name,
        $email,
        $mobile,
        str_replace(",", "&#44;", $message), // Escape commas in message
        $date,
        $time
    ]);
    fclose($file);

    // Append to JSON file
    $jsonData = [];
    if (file_exists($jsonFilePath)) {
        $jsonData = json_decode(file_get_contents($jsonFilePath), true);
    }

    // Append new data
    $jsonData[] = $data;

    // Save the JSON data back to the file
    file_put_contents($jsonFilePath, json_encode($jsonData, JSON_PRETTY_PRINT));

    // Return success response
    echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
