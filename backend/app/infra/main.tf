
resource "google_iam_workload_identity_pool" "spacelift_pool" {
  workload_identity_pool_id = "spacelift-pool"
  location                  = "global"
  display_name              = "Spacelift OIDC Pool"
}

resource "google_iam_workload_identity_pool_provider" "spacelift_provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.spacelift_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "spacelift-provider"
  location                           = "global"
  display_name                       = "Spacelift Provider"

  oidc {
    issuer_uri = "https://aitention.app.spacelift.io"
  }


  attribute_mapping = {
    "google.subject" = "assertion.sub"
  }
}

resource "google_service_account" "spacelift_sa" {
  account_id   = "spacelift-ci"
  display_name = "Spacelift CI Service Account"
}

resource "google_service_account_iam_binding" "allow_wif" {
  service_account_id = google_service_account.spacelift_sa.name
  role               = "roles/iam.workloadIdentityUser"
  members = [
    "principalSet://iam.googleapis.com/projects/${var.gcp_project_number}/locations/global/workloadIdentityPools/${google_iam_workload_identity_pool.spacelift_pool.workload_identity_pool_id}/attribute.subject/*"
  ]
}
