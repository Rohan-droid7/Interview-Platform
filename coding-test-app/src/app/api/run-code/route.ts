import { NextResponse } from 'next/server';
import axios from 'axios';

const WANDBOX_API_URL = 'https://wandbox.org/api/compile.json';

export async function POST(req: Request) {
  try {
    const { language, version, code, stdin } = await req.json();

    const response = await axios.post(WANDBOX_API_URL, {
      compiler: 'gcc-head', // Defaulting to latest gcc for C++
      code: code,
      stdin: stdin || "",
    });

    return NextResponse.json({
      run: {
        stdout: response.data.program_message || "",
        stderr: response.data.compiler_error || response.data.program_error || ""
      }
    });
  } catch (error) {
    console.error('Error executing code:', error);
    return NextResponse.json({ error: 'Failed to execute code' }, { status: 500 });
  }
}
