import { supabase } from './supabaseClient'
import { UB_ADMIN_FOCAL_CREATE_FLAG } from './ubAdminSessionFlags'

/**
 * Signs out the current user and performs a hard navigation so auth state
 * cannot get stuck behind ProtectedRoute or client-side session caches.
 */
export async function signOutAndRedirect(redirectTo = '/login') {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(UB_ADMIN_FOCAL_CREATE_FLAG)
      sessionStorage.removeItem('showSplashScreen')
    }
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
    }
  } catch (err) {
    console.error('Sign out failed:', err)
  } finally {
    window.location.assign(redirectTo)
  }
}
