/**
 * File:     onboarding/page.tsx
 * Purpose:  Initializes the onboarding process in Iris.
 * Authors:  Ojos Project & Iris contributors
 * License:  GNU General Public License v3.0
 */
"use client";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { DataPackReceipt } from "@/types/settings";
import Layout from "@/components/Layout";

export default function Onboarding() {
  const router = useRouter();
  const [dataPackDialog, setDataPackDialog] = useState({
    enabled: false,
    title: "",
    content: "",
    hideSelectButton: false,
  });
  return (
    <Layout title=" " disabledBackButton={true}>
      <div className={styles.onboardingCenter}>
        {dataPackDialog.enabled && (
          <Dialog title={dataPackDialog.title} content={dataPackDialog.content}>
            <Button
              type={dataPackDialog.hideSelectButton ? "PRIMARY" : "SECONDARY"}
              label={dataPackDialog.hideSelectButton ? "Done" : "Back"}
              onClick={() =>
                setDataPackDialog({
                  enabled: false,
                  title: "",
                  content: "",
                  hideSelectButton: false,
                })
              }
            />
            {!dataPackDialog.hideSelectButton && (
              <Button
                type="PRIMARY"
                label="Select JSON..."
                onClick={() => {
                  invoke<DataPackReceipt>("import_data_pack")
                    .then((receipt) => {
                      let title = "Sorry, something went wrong.";
                      let message =
                        "No data was imported. Make sure the data isn't already in the database. Consult the docs for more information.";

                      if (
                        receipt.pro_count ||
                        receipt.resources_count ||
                        receipt.contacts_count
                      ) {
                        title = "Data Pack was successfully imported!";
                        message = "";
                      }

                      if (receipt.pro_count) {
                        message += `${receipt.pro_count} PRO question${receipt.pro_count > 1 ? "s" : ""} imported.\n`;
                      }
                      if (receipt.resources_count) {
                        message += `${receipt.resources_count} resource${receipt.resources_count > 1 ? "s" : ""} imported.\n`;
                      }

                      if (receipt.contacts_count) {
                        message += `${receipt.contacts_count} contact${receipt.contacts_count > 1 ? "s" : ""} imported.\n`;
                      }

                      setDataPackDialog({
                        enabled: true,
                        title: title,
                        content: message,
                        hideSelectButton: false,
                      });
                    })
                    .catch((e) => {
                      setDataPackDialog({
                        enabled: true,
                        title: "Sorry, something went wrong.",
                        content: e,
                        hideSelectButton: true,
                      });
                    });

                  setDataPackDialog({
                    enabled: false,
                    title: "",
                    content: "",
                    hideSelectButton: false,
                  });
                }}
              />
            )}
          </Dialog>
        )}
        <h1>Welcome to Iris!</h1>
        <h3>Your care management system</h3>

        <div className={styles.buttonOnBottom}>
          <Button
            type="SECONDARY"
            label="Import Data Pack"
            onClick={() => {
              setDataPackDialog({
                enabled: true,
                title: "Have a Data Pack?",
                content:
                  "You can import contacts, resources, and survey questions using JavaScript Object Notation. If you have one, you can import it here.",
                hideSelectButton: false,
              });
            }}
          />
          <Button
            type="PRIMARY"
            label="Get Started"
            onClick={() => {
              router.push("/onboarding/patient/");
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
