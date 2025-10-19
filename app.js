import { createClient } from "https://esm.sh/@supabase/supabase-js";

// 🧩 Replace these with your Supabase project credentials:
const SUPABASE_URL = "https://qtzirdyfgjvscuoptxoi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0emlyZHlmZ2p2c2N1b3B0eG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NDgwNDAsImV4cCI6MjA3NjQyNDA0MH0.jea1fbyROQU4FjaJCwIEIeCX2mS7tAPFOIPAMvWixU8";

// Create client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fetch and display data
async function fetchPeople() {
  const { data, error } = await supabase.from("people").select("*").order("id");
  if (error) console.error(error);

  const table = document.getElementById("peopleTable");
  table.innerHTML = "";

  data.forEach((person, index) => {
    const row = `
      <tr class="border-b hover:bg-gray-50">
        <td class="border p-2">${index + 1}</td>
        <td class="border p-2">${person.name}</td>
        <td class="border p-2">${person.age}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// Add new record
document.getElementById("personForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const { error } = await supabase.from("people").insert([{ name, age }]);
  if (error) console.error(error);

  document.getElementById("personForm").reset();
  fetchPeople();
});

// Initial load
fetchPeople();
