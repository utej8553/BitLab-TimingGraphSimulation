Verilog → VCD → Web Timing Diagram

This project executes a Verilog design and testbench on the server, generates a VCD file, and displays the timing diagram in a web browser using JavaScript and WaveDrom.

Directory Structure
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
├── pom.xml

Prerequisites

Ubuntu / Linux system

Install required packages:

sudo apt update
sudo apt install -y openjdk-17-jdk maven iverilog


Verify installations:

java -version
javac -version
mvn -v
iverilog -V

Verilog Simulation Setup
verilog/top.v
module top(
    input clk,
    output reg a
);
    initial a = 0;

    always @(posedge clk)
        a <= ~a;
endmodule

verilog/tb.v
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


Test simulation manually:

cd verilog
iverilog -o sim top.v tb.v
vvp sim
ls wave.vcd

Backend Execution (Spring Boot)

The backend executes the Verilog simulation using iverilog and returns the generated VCD.

Run backend:
cd BitLab-TimingGraphSimulation
mvn clean spring-boot:run


Server runs on:

http://localhost:8080

Frontend Execution

The frontend is served as static content by Spring Boot.

Workflow:

Click Run Simulation

Backend executes Verilog

VCD is returned to frontend

JavaScript parses the VCD

WaveDrom renders the timing diagram

No additional frontend build tools are required.

Access the Application

Open in browser:

http://<server-ip>:8080

Execution Pipeline
Verilog → Icarus Verilog → VCD → Spring Boot → JavaScript → WaveDrom → Browser
