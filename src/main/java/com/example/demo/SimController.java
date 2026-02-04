package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.nio.file.*;
import java.io.*;

@RestController
public class SimController {

    @GetMapping("/run")
    public String runSimulation() throws Exception {

        ProcessBuilder pb = new ProcessBuilder(
                "bash", "-c",
                "cd verilog && iverilog -o sim top.v tb.v && vvp sim && cat wave.vcd"
        );

        pb.redirectErrorStream(true);
        Process process = pb.start();

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(process.getInputStream()));

        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }

        process.waitFor();
        return output.toString();
    }
}
