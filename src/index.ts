#!/usr/bin/env node
import { runProgram } from './program/main.js';
import { createStorageFile } from './program/prep/createStorageFile';

createStorageFile();

runProgram();
