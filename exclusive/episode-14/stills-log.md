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

## Blocking / face / perspective rebuild, 6 Oct 2026 (board 321–324)
Rules now in bible section 1a: the host is on NIA'S LEFT in every exterior clip (frame RIGHT
when the camera faces Nia, frame LEFT when the camera is behind her); the face image is
attached to every generation; eye-level camera, everyone on the same floor.
| Plate | Take | Job |
|---|---|---|
| F | 321, from the carpet facing Nia, host at frame RIGHT (Nia's left) | 640a8b08-af26-4853-aef1-05f13becc330 |
| F | 322, from behind Nia's left, car + host at frame LEFT, building ahead | 04db9a2b-594e-4ccf-b2d5-eaac5ad2fe25 |
| G | 323, eye level from inside the hall, full length, same floor as guests | 6103af4c-b982-4645-b57a-cf7b57b8ea63 |
| G | 324, eye level, waist-up, guests' heads level with hers | 1b60994a-4499-487e-add3-c45fd1a50834 |
311–314 are retired in favour of 321–324.

## Plate F redo, 6 Oct 2026 (board 331–332)
User notes on 321/322: Nia's profile wrong; car must be parallel with the kerb; host must
stay on the same side. Rebuilt with the car side-on along the kerb, Nia's face in
three-quarter toward camera (never profile), the host on Nia's LEFT = frame RIGHT, and the
approved waist-up master C (e14efbba) attached alongside the face image as a second face
anchor. 333 (waist-up) was filter-rejected.
| Take | Job |
|---|---|
| 331 medium, from the carpet facing Nia | 8216d4fd-a1c9-464c-a3db-26de60d02ef0 |
| 332 full length, shoes visible | 3891bf20-50a1-4c0c-907a-311ae84731b8 |
321/322 retired.

## Picks locked 6 Oct 2026: F 332, G 323, H 306, I 308
| Plate | Job | Is also the still for |
|---|---|---|
| F exterior, car door | 3891bf20-50a1-4c0c-907a-311ae84731b8 | C24 |
| G doorway | 6103af4c-b982-4645-b57a-cf7b57b8ea63 | C26 |
| H Tay + suits | 6fbf35ba-8032-494b-a3db-10b82e69d4f5 | C27 |
| I two-shot | 54b56044-39d0-4a74-a2ba-d3245dd1662b | C29 |
Blocking table corrected: Tay is on NIA'S LEFT on the main floor (C32 has his right hand at
her left elbow), so he is frame RIGHT when the camera faces them and frame LEFT behind them.

## Rulings 6 Oct 2026 (fourth review): height and whole bodies
Tay a full head taller than Nia in every two-shot (her head at his shoulder); every person
in frame a complete body on the floor; the bar is a counter, the boys stand on the floor
side of it. Rules in bible section 1a. 341–344 and the first C30 (8a7edbba) are retired.

## Board after the F/G/H/I picks (6 Oct 2026)
| Item | Job | Note |
|---|---|---|
| C25 up the carpet (edit of F) | 1daf62b4-fbe8-4c04-a65d-1c987b99b2dd | host on Nia's left = frame right |
| C28 Tay crossing the floor (edit of H) | 298a8e0d-b6ec-45ee-92d4-ae07571bc5b5 | |
| Plate I height-corrected (C29) | 329 ea4d0185-4d0c-467f-95f3-2573dfe2df51 | replaces 308 if approved |
| C30 height-corrected (edit of I) | 330 93241774-6bd3-483e-80d5-8d17cce10369 | |
| Plate K walk-and-talk, take 3 knees-up | 345 0eaa6c34-b000-455b-9e33-54001ee943d4 | height rule |
| Plate K walk-and-talk, take 4 full length | 346 df2f4bbc-1416-4acb-ab6c-eb9455c2b4f0 | height rule |
| Plate J boys at the bar, take 3 wide with Nia+Tay | 347 c9a1f2cc-7ef5-4c77-a8d4-114c77f06cfd | whole bodies, floor side |
| Plate J boys at the bar, take 4 facing camera, no Nia/Tay | 348 537d614e-ad3e-43db-b8e8-db396a4e0a75 | reverse for C31 |
| Vault V1 (C33) | 351 ee20880a-12e5-4bfb-82d1-998062da659e | |
| Vault V2 (C34) take 1 medium | 352 94190b67-706a-4670-b2af-e9ce7893739e | |
| Vault V2 (C34) take 2 wider | 353 b41b3d29-b5c2-4292-b2b0-e9108b5c9f4a | |
| Cage L (C39) | 361 4cb89565-e2d4-4ca7-883a-352d6a378e2e | |
| Zarya kiss M take 1 | 362 34ec611d-7610-4be4-bcd3-c1e8e41df2ff | |
| Zarya kiss M take 2 | 363 b764bb8e-c2b4-499c-ad15-a50033e89bbc | |
| Nia close N (C41), edit of G | 367 06863fa6-b18f-438e-9f4c-58c65a215c8f | 364 filter-rejected |
| Bar O (C46) take 1, from behind | 365 c25cd74d-2901-4a98-8a0e-f0e18d8c42ee | 366 and 368 filter-rejected |
| Roof R1 (C50) | 371 cdbd9dad-9bac-4b75-98ba-79b5a61b79db | |
| Roof R2 (C52) take 1 profile | 372 f4d1b47c-7272-46b7-a96f-f662fc501b56 | |
| Roof R2 (C52) take 2 three-quarter waist-up | 373 119c85cc-1aad-41d9-93a1-af278c89f333 | |
Vault blocking: Tay sits at frame LEFT, Nia stands at frame RIGHT, as the set map has it, so
in the vault Tay is on NIA'S RIGHT (door side); recorded as a row in the blocking table.

## Fix pass, 6 Oct 2026 (fifth review): vault furniture, side-by-side, roof level
Rules added to bible 1a (furniture lock per set, side-by-side for any hand-on-back beat).
| Item | Job | Note |
|---|---|---|
| Vault V2 take 3 (C34), EDIT of V1 351 | 354 d2f923a5 | filter-rejected |
| Vault V2 take 4 (C34), EDIT of V1 351, slight push-in | 355 97bcbd15-c5dd-47ce-b1c8-f7375c8e944f | furniture identical to V1 |
| Boys at the bar J take 5 (C31), EDIT of 347 | 349 ed4bc0d9-cf4b-49b3-b80f-06bc1d59e4b1 | Tay beside Nia, hand on the small of her back |
| Roof R1 take 2 (C50), EDIT of 371 | 374 71dad054-17ca-4f6c-9fa4-8c0270278e04 | eye level, same pavers as guests |
352, 353, 347 and 371 are retired.

## Fix pass, 6 Oct 2026 (sixth review): bar arrival restaged, Tay seated in the vault
| Item | Job | Note |
|---|---|---|
| Boys at the bar J take 6 (C31), EDIT of 348, couple added from behind | 381 e0ffc9c4-fe84-4db1-81f4-3c32edc47f8a | Tay frame LEFT beside Nia, right hand on her lower back |
| Boys at the bar J take 7 (C31), same, pulled back full length | 382 92025e08-2753-46f2-8803-33f6d3ba8136 | |
| Vault V2 take 5 (C34), EDIT of V1 351 | 356 c12561e8-705b-49b8-b5bd-dbb1bbcbdf49 | Tay IN the chair, feet flat on the rug |
| Vault V2 take 6 (C34), EDIT of V1 351, slight push-in | 357 78c3a0ab-bd92-4048-b426-3dbfc3a444d6 | |
349 and 355 are retired. Bible C34–C38 now say Tay sits IN the chair on its seat, feet on the
rug; C31 is staged from behind the couple so the hand on her back is unambiguous.

## Fix, 6 Oct 2026 (seventh review): Tay cloned into the boys
Cause: Tay's look image was attached to the boys plate (348) as a clothing reference, so
the middle boy became Tay. Rule added to bible 1a. Fix = edit of 381/382 swapping only that
one man for a different friend.
| Item | Job |
|---|---|
| C31 fix, from 381 | 383 9976adca-fb1d-4cf3-8dd9-ac6c2f71ac55 |
| C31 fix, from 382 | 384 6d13305e-1261-487b-9a45-6dab5de9ffb1 |

## Picks locked 6 Oct 2026 (second round): J 384, V2 357, K 346, M 363, R2 373
| Plate | Job | Is also the still for |
|---|---|---|
| J boys at the bar | 6d13305e-1261-487b-9a45-6dab5de9ffb1 | C31 |
| K walk-and-talk | df2f4bbc-1416-4acb-ab6c-eb9455c2b4f0 | C32 |
| V1 vault entry | ee20880a-12e5-4bfb-82d1-998062da659e | C33 |
| V2 vault seated | 78c3a0ab-bd92-4048-b426-3dbfc3a444d6 | C34 |
| L cage | 4cb89565-e2d4-4ca7-883a-352d6a378e2e | C39 |
| N Nia at the edge | 06863fa6-b18f-438e-9f4c-58c65a215c8f | C41 |
| M Zarya kiss | b764bb8e-c2b4-499c-ad15-a50033e89bbc | C43 |
| O bar with Zarya | c25cd74d-2901-4a98-8a0e-f0e18d8c42ee | C46 |
| R1 roof wide | 71dad054-17ca-4f6c-9fa4-8c0270278e04 | C50 |
| R2 roof two-shot | 119c85cc-1aad-41d9-93a1-af278c89f333 | C52 |
| I two-shot (height-corrected) | ea4d0185-4d0c-467f-95f3-2573dfe2df51 | C29 |

## Remaining clips, submitted 6 Oct 2026 (edits of the plates above, faces attached)
| Clip | Plate | Job |
|---|---|---|
| C35 | V2 | 7ce3b009-5bbb-4cc0-94b2-145918fff021 |
| C36 | V2 | 5687f659-1006-4b00-bd62-f0c75e934f27 |
| C37 | V2 | 6db81c66-6689-49c4-833e-8f17ed39e4c6 |
| C38 | V2 | d60bcb79-3aee-40f2-8983-afc562d111b2 |
| C40 | L | bb45d9b0-c9d2-4993-9bc6-361bc513847b |
| C42 | L | edead467-e124-486f-a0cd-2143e0638157 |
| C44 | M | a796760f-e57a-4c1a-a98f-8a708ea41558 |
| C45 | N | 7a2ff4d8-1729-43a1-bcb4-e9d00ddedf72 |
| C47 | O | 90bf7eb5-4d0f-4c0b-a077-8e34fcc35c2d |
| C48 | O | 8d6f26d1-c515-4e5d-b18f-189534cce797 |
| C49 | O | 04cbee31-91f9-46c4-b5e9-0fcd94c0f087 |
| C35 retry (edit of C37; 7ce3b009 filter-rejected) | V2 | 3ed261fa-d538-4efc-b8d1-65b6997b4e27 |
| C51 | R1 | 708b7071-095b-4c22-aa7f-068a32c6081f |
| C53 | R2 | 6f857acc-093d-45b1-99c5-245f7cd440cc |
| C54 | R2 | 39962a8c-564a-4032-87b9-daeb62066ad0 |
| C55 | R2 | a12abd29-da4d-4e8b-8a2b-92981ee16d9a |
| C56 | R2 | e40fe4d9-bf92-4873-8d4f-f84142faee21 |
| C57 | R2 | 5522c0f5-078b-42aa-82de-ad97933f9f37 |
| C58 | R2 | 2d37c117-2130-40fd-8ca4-6a908e47c68b |
| C59 | R1 | 98382a55-4535-452c-997d-2208ef430481 |
| C60 | R1 | d0964779-110d-4915-8c14-d02395b10950 |
C35 (Nia's vault close-up): three filter rejections (7ce3b009, 3ed261fa, fbaf50ba). Not
retried further; the C37 two-shot (6db81c66) is the coverage, the editor punches in on her.
All 63 clips now have a still or a covering still.
