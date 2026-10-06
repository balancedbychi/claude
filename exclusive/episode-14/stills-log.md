# Episode 14 "Nice Building" — stills log (6 Oct 2026)

## Method change after first review
The first pass built all 63 clip stills straight from element placeholders. The user's review
found face drift in wide shots (the doorway wide read as a different woman), bag and shoe
drift away from the uploaded dress image, hallucinated hands in the elbow shot, a phone
floating instead of leaning on the lamp, and ChiChi not reading as looking into her phone.

Fix, same as episode 12: build ONE MASTER PLATE per camera setup with the real face image
and the uploaded wardrobe image ATTACHED as reference images (not placeholders only), get
each master approved, then build every clip in that setup as a continuity EDIT of its master
("reproduce the reference image EXACTLY, change ONLY the pose, hands and expression").

## Attached reference images (media ids)
| Use | Media id |
|---|---|
| Nia face | f6cb34ea-d129-47b0-b9ed-3543a76c6177 |
| Nia dress, shoes, bag (user upload) | 244e2ef0-1aee-4711-80d4-7e20d629b182 |
| ChiChi face | 7af2905b-301b-4d9a-b114-2ff61b9f565a |
| ChiChi outfit | e29f33f6-0b4c-4c28-96c4-7587a91644dc |
| Tay face | 62537189-1f9b-49ad-a232-2481b7bf41a6 |
| Tay body | 66e022d9-f27f-43c8-a0c5-9d8076a36901 |
| Tay look (job) | 111741c2-d0d7-4051-81b3-f8a29910095d |
| Zarya master | dc4779ad-c2cc-4a43-aa27-f8a2843dd367 |

## Rulings 6 Oct 2026 (second review)
- Scene 14.1 is NIGHT. New element **Nia-Living-Room-Night 67647bad-c232-4311-a131-750100ce3bd3**
  (job f5c634e5, the user's pick of two relights). Masters A and C are rebuilt in it; the sunset
  masters c6398195 and 65dc19e7 are retired.
- Car master E locked: job **848f2d08-ec58-4b07-894e-a5f393531d80** (user's pick of two), built
  with the car plate attached; Nia sits upright on the bench with the seat belt on.

## Ruling 6 Oct 2026 (third review): BROWN bag and shoes
The dress upload shows a BROWN bag and BROWN shoes. v1/v2 element text said gold, inherited
from "Almost Too Good", and every first-pass still followed the words, not the picture.
New element **Nia-Nice-Building-Dress-v3 62615e58-aba0-49ff-8fd7-a70089fee959** corrects it.
Rule: attach the upload (media 244e2ef0) to every generation that shows the bag or shoes and
say "brown" in words.

Masters locked: A 376b8dbe, B 79f6b827 (pull-back from D), C e14efbba (waist-up, hair
forward), D b43f21a6, E (car) 848f2d08.

## Scene 14.1 master plates
| Plate | Setup | Job |
|---|---|---|
| A (night) | Nia living room, wide, Nia in the dress on the rug, phone leaning on the lamp | 376b8dbe-cb67-4c73-aca7-3ecee1c666b1 **APPROVED** |
| B | ChiChi on her sofa, medium, looking into the phone | 157dc803 rejected; retakes 79f6b827 (pull-back from D) and 5559a79a (fresh, room attached) |
| C (night) | Nia medium, now WAIST-UP with hair forward (chest-up crops trip the output filter: b65f4794, 2f5449db, c13a3550 all rejected by the filter) | retakes 5456cdba (edit of A) and e14efbba (fresh, room attached) |
| D | ChiChi close, chest-up, looking into the phone | b43f21a6-133e-48e6-8918-785f5024ed59 **APPROVED** |
| E | Car back seat, Nia upright, phone at chest height (LOCKED) | 848f2d08-ec58-4b07-894e-a5f393531d80 |

Clips per plate: A → C01 (robe), C03 (robe), C05, C08, C16, C18, C20. B → C02, C04, C06, C07.
C → C10, C12, C14. D → C09, C11, C13, C15, C17, C19. E → C21, C22, C61, C62, C63.

## First-pass clip jobs (superseded once the master-plate rebuild is approved)
Kept for reference only; see Higgsfield gallery. Filter rejections on first pass: C05, C10,
C14, C16, C20, C24 (dropped), C21, C22, C48, C57, C58, C61, C63 (nsfw false positives).
C10 and C22 never passed as fresh generations; both will be edits of a master.

## Scene 14.1 clips (edits of the approved masters), 6 Oct 2026
All built with the master attached as `image_references` and a "change ONLY" edit prompt.
Shown to the user as one gallery (indices 1–23, 61–63).

| Clip | Plate | Job |
|---|---|---|
| C01 (robe, green dress on sofa) | A + dress upload | ce89a36f-b912-4c29-a209-40dfcfcc7601 |
| C02 | B | c645ef6b-4f81-4de0-88c7-c41256d47795 |
| C03 (robe, lifting the dress) | A + dress upload | 9c8b8b27-2459-4565-a106-c49097adfc40 |
| C04 | B | 60e3a1f9-743c-4f7f-a800-71f506009906 |
| C05 | A | 596879a8-1901-43b4-af97-ce0abb538b69 |
| C06 | B | 51d6dbd0-931b-4296-83a6-5d2466ee484b |
| C07 | B | f0ce3ced-c466-4541-a1d8-b885c130cc8e |
| C08 | A | b1820539-6182-459c-8f53-ec70b1b6fe95 |
| C09 | D | 9456393b-56b2-4f2b-8f50-3c893fb655bf |
| C10 | A (moved off plate C: three filter rejections 5593e84f, 9b0a1b9d on the waist-up crop) | 9124aad2-49be-418b-b861-5d453c4f3dd7 |
| C11 | D | e4593231-3f13-4657-a789-1e668683cfe2 |
| C12 | C | 1e401d8c-ffc9-4854-81f6-178701daa165 |
| C13 | D | 5baba209-7838-4214-8bab-63b7f49f77c8 |
| C14 | C | c48080b5-0dbf-440d-9178-ebdf4a84dd36 |
| C15 | D | 1bd86860-da0a-4c43-b089-cea1626f0c17 |
| C16 | A | b5c8be33-7761-4497-a08b-5d83273f5d19 |
| C17 | D | 03150b7d-b74f-4d62-8862-188c83ce5036 |
| C18 | A | 89316020-2711-4bc1-987a-1c6ff640ec06 |
| C19 | D | 7d67890d-7a41-4520-bb5b-89789f271137 |
| C20 | A | 706a5ea1-6633-48bc-b71e-93dd63c7b76b |

Bible note: C10 is now framed WIDE (same camera as C05/C08) instead of the waist-up C-plate;
C12 and C14 stay on plate C.

## Car clips (edits of master E 848f2d08 + dress upload 244e2ef0), 6 Oct 2026
| Clip | Job |
|---|---|
| C21 texts, fighting a smile | a1e0e0c5-9b34-4636-88dc-f3e14c6596a3 |
| C22 looks out, "Okay. It's a building." | dd03451e-a394-4e97-b572-31f04366cdce |
| C23 POV exterior (fresh, set element) | 197429e1-30a4-40a5-beb2-84639183c8be (unchanged) |
| C61 texts, blank | 5f1d290e-dcea-43a1-a22d-06f9e39f84b9 (edit of C21; 1075f6f0 and 5ce75bec filter-rejected) |
| C62 thumb over the glass | b88eab86-003c-4b6d-8e50-57b36bd08f18 |
| C63 face down, building behind | 7ef7092b-cecf-4e3a-8c2a-e46ba1c39cbe |

## Master plates F–I, option board 301–308 (6 Oct 2026), awaiting the user's picks
Built fresh with the set image + face image + outfit image attached as references.
| Plate | Setup | Take 1 | Take 2 |
|---|---|---|---|
| F | Exterior, Nia + the host at the car door (C24; C25 is an edit) | 301 88840f3a-8aec-49d0-8204-9b333fa7948b (medium) | 302 703e8f48-6f8d-4717-818c-94db20508dbc (full length, shoes visible) |
| G | Main floor, Nia in the doorway (C26) | 303 ff0df693-95a5-4dfa-848c-66be6ee18929 (low wide) | 304 109bba92-b79a-46d3-9497-726946eb929e (medium-wide, face readable) |
| H | Tay with the suits (C27) | 305 a3d16eb0-68be-4896-a575-0653eba7c46c (medium) | 306 6fbf35ba-8032-494b-a3db-10b82e69d4f5 (waist-up) |
| I | Nia + Tay two-shot (C29, C30; the walk-and-talk and roof two-shots re-use the pairing) | 307 b526d55a-83b9-4b23-9ae2-ec8be7c060f8 (profile) | 308 54b56044-39d0-4a74-a2ba-d3245dd1662b (three-quarter) |

References attached: exterior 6875822c / main floor 878e54a0; Nia face f6cb34ea + dress upload
244e2ef0; Tay face 62537189 + Tay look job 111741c2.

Phone rule (user confirmed 6 Oct): in every phone shot only the back of the tan case is seen;
the texts are on-screen graphics in the edit, never rendered on the phone.

## Fix pass, 6 Oct 2026 (user review of gallery 1 and the F/G board)
Rulings: (1) phone inserts SHOW the thread on the screen, rendered in the image (the
"graphics in post" rule is withdrawn); (2) car exit geometry: sedan parallel to the kerb,
door opens out to the pavement, Nia steps out facing The Ledger, the host stands by the
open door; (3) C26: Nia faces INTO the hall.
| Item | Job |
|---|---|
| C21(b) phone insert, Tay thread | 75977c1a-0b12-4cea-bbdb-5beaeca844f8 |
| C61(b) phone insert, Tay's five texts | 3e817791-b2e1-4d53-bb91-af93fb37ea59 |
| C62 phone insert, Dorian "wyd" / "You still up?" | 39330e11-e5d5-4fef-9eac-11e393c3718f |
| Plate F take 3, from the carpet, Nia faces camera | 311 2765321a-d83f-415c-a552-993e58f93b5f |
| Plate F take 4, along the kerb, building at right | 312 652713c4-64bb-4c6e-987d-03c3ef9689da |
| Plate G take 3, from inside the hall, she faces in | 313 c2a9201a-642a-4f52-86f9-54ca1681abbf |
| Plate G take 4, over her shoulder into the hall | 314 0ca79d57-62de-46ce-a962-656f0f3d3260 |
Takes 301–304 are retired in favour of 311–314. The C21(a)/C61(a)/C63 back-of-phone shots
stay as the wide coverage; the inserts cut in on them.
