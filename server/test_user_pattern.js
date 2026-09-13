import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const SUPABASE_URL = 'https://rfqfqlpuybidmdvjtsxk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PLZ9NHhvtK38zt8EgLQ2nQ_KE8bfX2g';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testUserRequestedPattern() {
  console.log('🧪 Testing User Requested Supabase Pattern:\n');

  try {
    const name = 'Sister Maryam Al-Hadi';
    const age = 25;
    const gender = 'female';
    const city = 'Hyderabad';
    const state = 'Telangana';

    // 1. Get current user if authenticated
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const userId = user?.id || crypto.randomUUID();
    console.log('User ID for profile:', userId);

    console.log('\n2. Executing exact code:');
    console.log(`
const { data, error } = await supabase
  .from("profiles")
  .insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    name,
    age,
    gender,
    city,
    state,
    country: "India"
  })
  .select()
  .single();
    `);

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: crypto.randomUUID(),
        user_id: userId,
        name,
        age,
        gender,
        city,
        state,
        country: "India"
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Insert Error:', error);
    } else {
      console.log('✅ Connection and Profile Insertion SUCCESSFUL!');
      console.log('Returned Record from Supabase:');
      console.log(data);
    }

    // Clean up test profile
    if (data?.id) {
      await supabase.from('profiles').delete().eq('id', data.id);
      console.log('\n🧹 Test profile record cleaned up successfully.');
    }
  } catch (err) {
    console.error('Unexpected error during test:', err);
  }
}

testUserRequestedPattern();
