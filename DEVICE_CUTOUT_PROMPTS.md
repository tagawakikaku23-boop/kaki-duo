# Device cutout editing

Built-in image_gen, transparent background requested. The PNG original is kept in the local deliverable at assets/kaki-devices-cutout-original.png; the site serves alpha-preserving WebP files. The logo motion uses the original SVG independently. Exterior pixel alpha confirmed zero. No background is baked into the site asset.

## Initial cutout

+Use case: background-extraction. Edit target: supplied KAKI Duo tablet and smartphone mockup. Remove ONLY the seamless studio wall/floor background and the cast shadows on that floor, making the background genuinely transparent with an alpha channel. Keep the exact same two devices, their arrangement, complete silhouettes, rear cameras, silver/titanium material, reflections, engraved persimmon marks and exact 'KAKI Duo' wordmarks unchanged. Preserve their original positions and proportions in the same wide 3:2 canvas. Retain realistic self shading on metal but no opaque background, no artificial white halos, no checkerboard painted into pixels, no added objects, no new text. Precise clean antialiased edges around both devices. The output is an isolated cutout of the two devices, for compositing on a website and animating a separate logo above them.

## Edge refinement

+Use case: background-extraction. Edit the attached tablet and phone cutout. Important correction: remove ALL of the broad blurry gray haze, glow and shadows OUTSIDE the two hardware silhouettes. Every pixel outside the actual device metal contours must be fully transparent alpha=0, including the area to the left, right and below the devices. Preserve the exact same devices, all metal shading INSIDE their silhouettes, engravings and wordmarks, camera details, positions, aspect ratio, and the full original 3:2 canvas. Use precise clean antialiased edges only, not a feathered background mask. No studio wall, no floor, no cast shadow, no ambient haze or bloom. The desired result is just the two sharp hardware silhouettes isolated against genuine transparency, suitable for a clean white webpage.
