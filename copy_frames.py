import os
import shutil

source_dir = r"c:\Users\saira\CrossDevice\R A M A N A\programer\react\protfolio-for-discord\public\frames_1778240314947"
target_dir = r"c:\Users\saira\CrossDevice\R A M A N A\programer\react\protfolio-for-discord\public\frames_881"

if not os.path.exists(target_dir):
    os.makedirs(target_dir)

total_frames = 4003
target_frames = 881

for i in range(1, target_frames + 1):
    src_idx = i
    
    src_name = f"frame_{src_idx:05d}.jpg"
    dst_name = f"frame_{i:05d}.jpg"
    
    src_path = os.path.join(source_dir, src_name)
    dst_path = os.path.join(target_dir, dst_name)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)

print(f"Copied {target_frames} frames to {target_dir}")
