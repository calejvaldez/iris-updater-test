// File:     care_instructions/schema.rs
// Purpose:  SQL schema for the Care Instructions command.
// Authors:  Ojos Project & Iris contributors
// License:  GNU General Public License v3.0
pub static CARE_INSTRUCTIONS_SCHEMA: &str = r#"
/*
care_instruction
Extra care instructions provided by the caregivers for the nurses.

Rows:
    * id            - A UUID
    title           - Short title for the instruction
    content         - A more detailed description of the instruction.
    frequency       - A readable format, such as "Once daily"
    added_by        - A User.id
    last_updated    - A Unix timestamp indicating the last edit
*/
CREATE TABLE IF NOT EXISTS care_instruction (
    id TEXT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    frequency TEXT,
    added_by TEXT NOT NULL,
    last_updated INTEGER NOT NULL
) STRICT;
"#;
