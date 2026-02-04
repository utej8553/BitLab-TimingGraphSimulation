## Sample Output

![Timing Diagram](image.jpg)
📟 Verilog → VCD → Web Timing Diagram
This project provides a full-stack solution to execute a Verilog design and testbench on a server, generate a VCD (Value Change Dump) file, and visualize the results as a timing diagram in a web browser using JavaScript and WaveDrom.

📂 Directory Structure
Plaintext
BitLab-TimingGraphSimulation/
├── verilog/
│   ├── top.v
│   └── tb.v
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/demo/
│       │       ├── DemoApplication.java
│       │       └── SimController.java
│       └── resources/
│           └── static/
│               ├── index.html
│               └── app.js
└── pom.xml
🛠 Prerequisites
This project is designed for Ubuntu / Linux systems. Ensure you have the following packages installed:

Installation
Bash
sudo apt update
sudo apt install -y openjdk-17-jdk maven iverilog
Verify Installations
Bash
java -version
javac -version
mvn -v
iverilog -V
🧬 Verilog Simulation Setup
The simulation consists of a simple toggle flip-flop logic and a testbench that dumps signal transitions.

verilog/top.v
Verilog
module top(
    input clk,
    output reg a
);
    initial a = 0;

    always @(posedge clk)
        a <= ~a;
endmodule
verilog/tb.v
Verilog
module tb;
    reg clk = 0;
    wire a;

    top uut (.clk(clk), .a(a));

    always #5 clk = ~clk;

    initial begin
        $dumpfile("wave.vcd");
        $dumpvars(0, tb);
        #50 $finish;
    end
endmodule
Manual Testing
To verify the simulation manually before running the web app:

Bash
cd verilog
iverilog -o sim top.v tb.v
vvp sim
ls wave.vcd
🚀 Backend Execution (Spring Boot)
The Java backend handles the system-level execution of iverilog and serves the generated VCD content.

Navigate to the project root:

Bash
cd BitLab-TimingGraphSimulation
Run the application:

Bash
mvn clean spring-boot:run
Server URL: The server runs by default on http://localhost:8080

🌐 Frontend & Workflow
The frontend is served as static content by Spring Boot. It uses WaveDrom to translate VCD data into a readable timing diagram.

Execution Pipeline
Verilog → Icarus Verilog → VCD → Spring Boot → JavaScript → WaveDrom → Browser

Click Run Simulation: The frontend triggers a request to the SimController.

Backend Execution: The server runs the Verilog simulation via shell commands and reads the resulting wave.vcd file.

Data Return: The VCD content is sent back to the frontend as a string or file stream.

Parsing & Rendering: app.js parses the VCD data and uses the WaveDrom engine to render the diagram in the browser.

🖥 Accessing the Application
Open your browser and navigate to:

Local: http://localhost:8080

Remote (EC2): http://<your-server-ip>:8080
